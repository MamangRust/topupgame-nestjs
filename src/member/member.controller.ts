import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { EditProfileDto } from './dto/editProfile.dto';
import { SignInDto } from './dto/signInMember.dto';
import { SignUpDto } from './dto/signUpMember.dto';
import { MemberService } from './member.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemberGuard } from './guard/member.guard';


@ApiTags('Members')
@Controller('members')
export class MemberController {
    constructor(private readonly memberService: MemberService) { }

    @ApiOperation({ summary: 'Sign up as a new member' })
    @ApiCreatedResponse({ description: 'Member signed up successfully', type: Object })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @Post('signup')
    @UseInterceptors(FileInterceptor('avatar'))
    async signUp(@Body() signUpData: SignUpDto, @UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
            ]
        })
    ) avatar: Express.Multer.File,): Promise<{ message: string }> {
        return this.memberService.signUp(signUpData, avatar);
    }

    @ApiOperation({ summary: 'Sign in as an existing member' })
    @ApiOkResponse({ description: 'Member signed in successfully', type: Object })
    @ApiNotFoundResponse({ description: 'Email not found' })
    @ApiUnauthorizedResponse({ description: 'Password does not match' })
    @ApiBody({ type: SignInDto })
    @Post('signin')
    async signIn(@Body() signInData: SignInDto): Promise<{ message: string, jwtToken: string }> {
        return this.memberService.signIn(signInData);
    }

    @ApiOperation({ summary: 'Edit member profile' })
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Profile edited successfully', type: Object })
    @ApiNotFoundResponse({ description: 'Member not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    @ApiBody({ type: EditProfileDto })
    @ApiParam({ name: 'memberId', description: 'Member ID' })
    @ApiConsumes('multipart/form-data')
    @Put(':memberId/edit-profile')
    @UseGuards(MemberGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    async editProfile(
        @Param('memberId') memberId: number,
        @Body() editProfileData: EditProfileDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                    new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                ]
            })
        ) avatar: Express.Multer.File,

    ): Promise<{ message: string }> {
        const removeAvatar = editProfileData.avatarName === '';
        return this.memberService.editProfile(memberId, editProfileData, avatar, removeAvatar);
    }


}
