import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'; // Import anotasi Swagger
import { AdminService } from './admin.service';
import { SignUpDto } from './dto/signUp.dto';
import { SignInDto } from './dto/signIn.dto';
import { AdminResponseDto } from './dto/admin-response.dto';
import { AdminAuthResponseDto } from './dto/admin_auth.response.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('signup')
    @ApiOperation({ summary: 'Create a new admin account' })
    async signUp(@Body() signUpDto: SignUpDto): Promise<AdminResponseDto> {

        return this.adminService.create(signUpDto);
    }

    @Post('signin')
    @ApiOperation({ summary: 'Authenticate admin' })
    @ApiBody({ type: SignInDto })
    async signIn(@Body() signInDto: SignInDto): Promise<AdminAuthResponseDto> {
        return this.adminService.login(signInDto);
    }
}
