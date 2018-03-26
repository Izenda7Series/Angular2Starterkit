using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using WebApiStarterKit.Models;

namespace WebApiStarterKit.IzendaBoundary
{
    public class IzendaTokenAuthorization
    {
#warning Change this key!!
        const string KEY = "THISISKEY1234567"; //must be at least 16 characters long (128 bits)

        /// <summary>
        /// Generate token from UserInfo. Userinfo will be encrypted before sending to Izenda.
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string GetToken(AccessTokenInfo user)
        {
            // remove tenant property when sending token to Izenda, if Tenant is System.
            if (user.TenantUniqueName == "System")
                user.TenantUniqueName = null;

            var serializedObject = Newtonsoft.Json.JsonConvert.SerializeObject(user);

            var token = StringCipher.Encrypt(serializedObject, KEY);
            return token;
        }

        /// <summary>
        /// Get the token for IzendaAdmin user, to communicate with Izenda to process when user has not been logged in.
        /// </summary>
        /// <returns></returns>
        public static string GetIzendaAdminToken()
        {
            var userName = ConfigurationManager.AppSettings["IzendaAdminUser"];

            var user = new AccessTokenInfo { UserName = userName };
            return GetToken(user);
        }


        /// <summary>
        /// Get User info from token. Token, which recieved from Izenda, will be decrypted to get user info.
        /// </summary>
        /// <param name="token"></param>
        /// <returns></returns>
        public static AccessTokenInfo GetUserInfo(string token)
        {
            var serializedObject = StringCipher.Decrypt(token, KEY);
            var user = Newtonsoft.Json.JsonConvert.DeserializeObject<AccessTokenInfo>(serializedObject);
            return user;
        }

        /// <summary>
        /// Decrypts the Izenda authentication message
        /// </summary>
        /// <param name="encryptedMessage"></param>
        /// <returns> the decrypted user information.</returns>
        public static AccessTokenInfo DecryptIzendaAuthenticationMessage(string encryptedMessage)
        {
            var rsaPrivateKey = ConfigurationManager.AppSettings["RSAPrivateKey"];
            var cipher = new System.Security.Cryptography.RSACryptoServiceProvider();

            //Decrypt using RSA private key in PEM format.
            var rsaParam = ConvertPemToXmlFormat(rsaPrivateKey);
            cipher.ImportParameters(rsaParam);
            //End

            ////Decrypt using RSA private key in XML format
            //rsaPrivateKey = "<RSAKeyValue><Modulus>zFZQcdI6f2yIg4m8fn+UnlGPa8Klf01ZIIPH1S2YFKmJpPIRGas04b2RGp+HqV5jmB4w7ClroK9kotuWKg1ySqaMOtg+n5cL/lbgx3j3LYFFsX9TZTwi+MBUpO9fBwBWs2Qly/fVziv4FY0p3YXBJOs/vZZNR5lwhw/dysF6LvU=</Modulus><Exponent>AQAB</Exponent><P>9XAmacVdbLsZOJdq11GvXnVpoeWmEI/52oLQ/3wUpBnDekNvspOMtle8G/7dKR3mm+qenkruTFxnDpfVV53G4w==</P><Q>1SFhB7AFT+/ehxDLgwdWEdBFRdkQzEbzNmk1lKgvZf8amipAw4n7DEjSoyqIXqXXr5DdyqSUDARylWnfzADCRw==</Q><DP>Bcsm7Po+sVFdUAuq9vgzpowo+Sxdlih/4luSKWW5awI8rgcnfNSkzq0VgKesesr85ZNNOTlVlLHdsOd+nrnXtw==</DP><DQ>RUqr3C77GykWRP1N3RS2g+Ydj37p+jAbBJaiB+nCNzwALx0Ln0ct6qmGaev7GCJ9BCRqJ2bohxuvESqxywZ4Iw==</DQ><InverseQ>zjfxF1xREc1TNjbFVUX0Bv+MaUZlqEszLH60WChxL7ArVka5DNbPsY889UMvWuM0/zymfIUlJcxHbMU9dmbuOg==</InverseQ><D>CevO8BfS+0jbv/c6DbJIFv/CxOqoemvY/fkoBLO4BJjOtBGEvwhPAv7fQrmoLpMEpuggW/cO4LhjXHzo55XLjLoRjBBbiPbZayaAeptP9oYMyBNwBp9d49taawXm7nxiOC8sszkzJ0gKFeN+plTQruDm+HspaGBmUHdCMlJ9zak=</D></RSAKeyValue>";
            //cipher.FromXmlString(rsaPrivateKey);
            ////End Decrypt using RSA private key in XML format

            var resultBytes = Convert.FromBase64String(encryptedMessage);
            var decryptedBytes = cipher.Decrypt(resultBytes, false);
            var decryptedData = System.Text.Encoding.UTF8.GetString(decryptedBytes);

            var result = Newtonsoft.Json.JsonConvert.DeserializeObject<AccessTokenInfo>(decryptedData);

            return result;
        }

        //Support to convert RSA key from PEM to XML, currently RSACryptoServiceProvider only support XML format.
        private static System.Security.Cryptography.RSAParameters ConvertPemToXmlFormat(string privateKey)
        {
            var privateKeyBits = System.Convert.FromBase64String(privateKey);

            var rsaParams = new System.Security.Cryptography.RSAParameters();

            using (var binr = new System.IO.BinaryReader(new System.IO.MemoryStream(privateKeyBits)))
            {
                byte bt = 0;
                ushort twobytes = 0;
                twobytes = binr.ReadUInt16();
                if (twobytes == 0x8130)
                    binr.ReadByte();
                else if (twobytes == 0x8230)
                    binr.ReadInt16();
                else
                    throw new Exception("Unexpected value read binr.ReadUInt16()");

                twobytes = binr.ReadUInt16();
                if (twobytes != 0x0102)
                    throw new Exception("Unexpected version");

                bt = binr.ReadByte();
                if (bt != 0x00)
                    throw new Exception("Unexpected value read binr.ReadByte()");

                rsaParams.Modulus = binr.ReadBytes(GetIntegerSize(binr));
                rsaParams.Exponent = binr.ReadBytes(GetIntegerSize(binr));
                rsaParams.D = binr.ReadBytes(GetIntegerSize(binr));
                rsaParams.P = binr.ReadBytes(GetIntegerSize(binr));
                rsaParams.Q = binr.ReadBytes(GetIntegerSize(binr));
                rsaParams.DP = binr.ReadBytes(GetIntegerSize(binr));
                rsaParams.DQ = binr.ReadBytes(GetIntegerSize(binr));
                rsaParams.InverseQ = binr.ReadBytes(GetIntegerSize(binr));
            }

            return rsaParams;
        }

        private static int GetIntegerSize(System.IO.BinaryReader binr)
        {
            byte bt = 0;
            byte lowbyte = 0x00;
            byte highbyte = 0x00;
            int count = 0;
            bt = binr.ReadByte();
            if (bt != 0x02)
                return 0;
            bt = binr.ReadByte();

            if (bt == 0x81)
                count = binr.ReadByte();
            else
                if (bt == 0x82)
            {
                highbyte = binr.ReadByte();
                lowbyte = binr.ReadByte();
                byte[] modint = { lowbyte, highbyte, 0x00, 0x00 };
                count = BitConverter.ToInt32(modint, 0);
            }
            else
            {
                count = bt;
            }

            while (binr.ReadByte() == 0x00)
            {
                count -= 1;
            }
            binr.BaseStream.Seek(-1, System.IO.SeekOrigin.Current);
            return count;
        }
    }
}