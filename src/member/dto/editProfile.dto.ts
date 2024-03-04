import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditProfileDto {
    @ApiProperty({ required: false, type: String })
    @IsOptional()
    @IsString()
    fullName?: string;

    @ApiProperty({ required: false, type: String })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ required: false, type: String })
    @IsOptional()
    @IsString()
    password?: string;

    @ApiProperty({ required: false, type: String })
    @IsOptional()
    @IsString()
    avatarName?: string;

    @ApiProperty({ required: false, type: 'string', format: 'binary' })
    avatar: any;
}
