//declare var IzendaSynergy: any; //= require("./izenda/izenda_ui");
let IzendaSynergy = require("../izenda/izenda_ui");
import { Injectable } from '@angular/core';

@Injectable()
export class IzendaIntegrate {
    DoIzendaConfig():void
    {
       IzendaSynergy.config({
            "WebApiUrl": "http://localhost:9999/api",
            //"WebApiUrl": "http://izenda-vm04.kms.com.vn:8200/api/",  
            "BaseUrl": "/",
            "RootPath": "/app/izenda",
            "CssFile": "izenda-ui.css",
            "Routes": {
                "Settings": "settings",
                "New": "new",
                "Dashboard": "dashboard",
                "Report": "report",
                "ReportViewer": "reportviewer",
                "ReportViewerPopup": "reportviewerpopup",
                "Viewer": "viewer"
            },
            "Timeout": 3600,
            "NeedToEncodeUrl" : false
        });
    }

   setContext():void {  
        var currentUserContext = {
            token: localStorage.getItem("izendatoken")
        };
        IzendaSynergy.setCurrentUserContext(currentUserContext);
    }

     /* Izenda Function */

    RenderIzenda()
    {
        this.setContext();
        IzendaSynergy.render(document.getElementById('izenda-root'));
    }

    RenderIzendaSettings()
    {
        this.setContext();
        IzendaSynergy.renderSettingPage(document.getElementById('izenda-root'));
    }

    RenderReportList()
    {
        let dom = document.getElementById('izenda-root');
        this.setContext();
        IzendaSynergy.renderReportPage(dom);
        return dom;
    }

    RenderReportDesigner(): any
    {
        this.setContext();
        let dom = document.getElementById('izenda-root');
        IzendaSynergy.renderReportDesignerPage(dom);
        return dom;
    }

    RenderReportViewer()
    {
        this.setContext();
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), '[your report id]');
    }

    RenderReportCustomizedFilterViewer()
    {
        this.setContext();
        let filtersObj:any = {
                                "filters": [],
                                "overridingFilterValue": 
                                {  // filter object to pass to api
                                    p1value: 50,            // override filter value at position 1 which is applying on current report, change >30 to >50
                                    p2value: '30;#40'       // override filter value at position 2 which is applying on current report, change beetween (20:50) to (30:40)
                                }
                            };
      
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-root'), '[your report id]', filtersObj);
    }

    RenderReportParts()
    {
        //debugger;
        this.setContext();
        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part1'), {
                "id": "[your 1st report part id]",
            });

        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part2'), {
                    "id": "[your 2nd report part id]",
                });

        IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part3'), {
                    "id": "[your 3rd report part id]",
                });

    }
    RenderDashboard()
    {
        this.setContext();
        IzendaSynergy.renderDashboardPage(document.getElementById('izenda-root'));
    }

    RenderDashboardDesigner()
    {
        this.setContext();
        IzendaSynergy.renderNewDashboardPage(document.getElementById('izenda-root'));
    }

    RenderDashboardViewer()
    {
        this.setContext();
        IzendaSynergy.renderDashboardViewerPage(document.getElementById('izenda-root'), '[your dashboard id]');
    }

    DestroyDom(dom: any)
    {
         this.setContext();
        IzendaSynergy.unmountComponent(dom);
    }

}

