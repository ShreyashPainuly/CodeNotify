"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const contests_service_1 = require("./contests.service");
const contests_controller_1 = require("./contests.controller");
const contest_schema_1 = require("./schemas/contest.schema");
const platforms_module_1 = require("../integrations/platforms/platforms.module");
const notifications_module_1 = require("../notifications/notifications.module");
const contest_scheduler_service_1 = require("./contest-scheduler.service");
let ContestsModule = class ContestsModule {
};
exports.ContestsModule = ContestsModule;
exports.ContestsModule = ContestsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: contest_schema_1.Contest.name, schema: contest_schema_1.ContestSchema }]),
            platforms_module_1.PlatformsModule,
            notifications_module_1.NotificationsModule,
        ],
        providers: [contests_service_1.ContestsService, contest_scheduler_service_1.ContestSchedulerService],
        controllers: [contests_controller_1.ContestsController],
        exports: [contests_service_1.ContestsService],
    })
], ContestsModule);
//# sourceMappingURL=contests.module.js.map