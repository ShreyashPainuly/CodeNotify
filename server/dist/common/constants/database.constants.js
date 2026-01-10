"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DATABASE = void 0;
exports.getDatabaseName = getDatabaseName;
exports.DATABASE = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/codenotify',
    DB_NAME: process.env.NODE_ENV === 'dev'
        ? `${process.env.DB_NAME || 'codenotify'}-dev`
        : process.env.DB_NAME || 'codenotify',
};
function getDatabaseName(nodeEnv = 'dev', baseDbName = 'codenotify') {
    return nodeEnv === 'dev' ? `${baseDbName}-dev` : baseDbName;
}
exports.DB_NAME = exports.DATABASE.DB_NAME;
//# sourceMappingURL=database.constants.js.map