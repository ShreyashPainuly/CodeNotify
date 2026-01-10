"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const mongoose_2 = require("mongoose");
const constants_1 = require("../common/constants");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: (configService) => {
                    const logger = new common_1.Logger('DatabaseModule');
                    const nodeEnv = configService.get('NODE_ENV', 'dev');
                    const baseDbName = configService.get('DB_NAME', 'codenotify');
                    const dbName = (0, constants_1.getDatabaseName)(nodeEnv, baseDbName);
                    const uri = configService.get('MONGO_URI', constants_1.DATABASE.MONGO_URI) +
                        '/' +
                        dbName;
                    logger.log(`Connecting to MongoDB...`);
                    logger.log(`Environment: ${nodeEnv}`);
                    logger.log(`Database: ${dbName}`);
                    return {
                        uri,
                        connectionFactory: (connection) => {
                            connection.on('connected', () => {
                                logger.log('MongoDB connected successfully');
                            });
                            connection.on('error', (error) => {
                                logger.error('MongoDB connection error', error.stack);
                            });
                            connection.on('disconnected', () => {
                                logger.warn('MongoDB disconnected');
                            });
                            if (connection.readyState === mongoose_2.ConnectionStates.connected) {
                                logger.log('MongoDB connected successfully');
                            }
                            return connection;
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map