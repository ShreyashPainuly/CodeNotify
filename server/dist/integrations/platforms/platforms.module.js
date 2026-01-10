"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformsModule = exports.PLATFORM_ADAPTERS = void 0;
const common_1 = require("@nestjs/common");
const codeforces_module_1 = require("./codeforces/codeforces.module");
const leetcode_module_1 = require("./leetcode/leetcode.module");
const codechef_module_1 = require("./codechef/codechef.module");
const atcoder_module_1 = require("./atcoder/atcoder.module");
const codeforces_adapter_1 = require("./codeforces/codeforces.adapter");
const leetcode_adapter_1 = require("./leetcode/leetcode.adapter");
const codechef_adapter_1 = require("./codechef/codechef.adapter");
const atcoder_adapter_1 = require("./atcoder/atcoder.adapter");
const common_constants_1 = require("../../common/common.constants");
exports.PLATFORM_ADAPTERS = common_constants_1.PLATFORM_ADAPTERS_TOKEN;
let PlatformsModule = class PlatformsModule {
};
exports.PlatformsModule = PlatformsModule;
exports.PlatformsModule = PlatformsModule = __decorate([
    (0, common_1.Module)({
        imports: [codeforces_module_1.CodeforcesModule, leetcode_module_1.LeetcodeModule, codechef_module_1.CodechefModule, atcoder_module_1.AtcoderModule],
        providers: [
            {
                provide: common_constants_1.PLATFORM_ADAPTERS_TOKEN,
                useFactory: (codeforces, leetcode, codechef, atcoder) => {
                    return [codeforces, leetcode, codechef, atcoder].filter((adapter) => adapter.config.enabled);
                },
                inject: [
                    codeforces_adapter_1.CodeforcesAdapter,
                    leetcode_adapter_1.LeetCodeAdapter,
                    codechef_adapter_1.CodeChefAdapter,
                    atcoder_adapter_1.AtCoderAdapter,
                ],
            },
        ],
        exports: [
            exports.PLATFORM_ADAPTERS,
            codeforces_module_1.CodeforcesModule,
            leetcode_module_1.LeetcodeModule,
            codechef_module_1.CodechefModule,
            atcoder_module_1.AtcoderModule,
        ],
    })
], PlatformsModule);
//# sourceMappingURL=platforms.module.js.map