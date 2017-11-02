using System;
using System.Security.Cryptography;
using System.Text;

namespace WebApi2StarterKit.IzendaBoundary
{
    public static class StringCipher
    {
        const int RequiredKeyLength = 16;

        //must be at least 16 characters long (128 bits)
        const string InitializationVector = "ALDAOQJkdak10314";

        private static readonly AesCryptoServiceProvider Crypto = new AesCryptoServiceProvider();

        public static string Encrypt(string raw, string key)
        {
            EnsureKeyLength(key);

            var keyBytes = Encoding.ASCII.GetBytes(key);
            var ivBytes = Encoding.ASCII.GetBytes(InitializationVector);

            byte[] inBlock = Encoding.UTF8.GetBytes(raw);
            ICryptoTransform xfrm = Crypto.CreateEncryptor(keyBytes, ivBytes);
            byte[] outBlock = xfrm.TransformFinalBlock(inBlock, 0, inBlock.Length);
            return Convert.ToBase64String(outBlock);
        }

        public static string Decrypt(string encrypted, string key)
        {
            EnsureKeyLength(key);

            var keyBytes = Encoding.ASCII.GetBytes(key);
            var ivBytes = Encoding.ASCII.GetBytes(InitializationVector);

            byte[] inBytes = Convert.FromBase64String(encrypted);
            ICryptoTransform xfrm = Crypto.CreateDecryptor(keyBytes, ivBytes);
            byte[] outBlock = xfrm.TransformFinalBlock(inBytes, 0, inBytes.Length);

            return Encoding.UTF8.GetString(outBlock);
        }

        private static void EnsureKeyLength(string key)
        {
            if (key.Length < RequiredKeyLength)
            {
                throw new Exception($"The encryption key must be {RequiredKeyLength} characters long.");
            }
        }
    }
}