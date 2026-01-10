import { PipeTransform } from '@nestjs/common';
export declare class EnumValidationPipe<T extends Record<string, string>> implements PipeTransform {
    private readonly enumType;
    private readonly enumName;
    constructor(enumType: T, enumName: string);
    transform(value: string): string;
}
