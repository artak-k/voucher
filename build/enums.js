"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageStatuses = exports.Currencies = void 0;
var Currencies;
(function (Currencies) {
    Currencies["USD"] = "USD";
    Currencies["EUR"] = "EUR";
    Currencies["RUB"] = "RUB";
    Currencies["KZT"] = "KZT";
})(Currencies || (exports.Currencies = Currencies = {}));
var UsageStatuses;
(function (UsageStatuses) {
    UsageStatuses["UNUSED"] = "UNUSED";
    UsageStatuses["USED"] = "USED";
})(UsageStatuses || (exports.UsageStatuses = UsageStatuses = {}));
