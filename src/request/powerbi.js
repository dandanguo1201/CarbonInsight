import * as pbi from 'powerbi-client';

const powerbi = new pbi.service.Service(
    pbi.factories.hpmFactory,
    pbi.factories.wpmpFactory,
    pbi.factories.routerFactory
);

export default {

    bootstrap(reportContainer) {
        powerbi.bootstrap(reportContainer, { type: "report" });
    },

    embedReport (embedData, reportContainer) {

        let reportLoadConfig = {
            type: "report",
            tokenType: pbi.models.TokenType.Embed,
            accessToken: embedData.accessToken,
            embedUrl: embedData.embedUrl[0].embedUrl,
        };
        let report = powerbi.embed(reportContainer, reportLoadConfig);

        report.off("loaded");
        report.on("loaded", function () {
            console.log("Report load successful");
        });

        report.off("rendered");
        report.on("rendered", function () {
            console.log("Report render successful");
        });

        report.off("error");
        report.on("error", function (event) {
            let errorMsg = event.detail;
            console.error(errorMsg);
            return;
        });
    }
}
