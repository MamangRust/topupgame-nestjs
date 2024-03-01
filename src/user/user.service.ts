import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async findAll(): Promise<User[]> {
    try {
      const result = await this.userRepository.find({
        relations: ["admin"],
        order: {
          role: "asc",
        }
      })

      return result;
    } catch (error) {
      throw new Error(`Hello error ${error}`)
    }
  }

  async countUserStatus(status: string): Promise<number> {
    try {
      const result = await this.userRepository.count({
        where: {
          status: status
        }
      })

      return result;
    } catch (error) {
      throw new Error("Unable to count user status " + error)
    }
  }

  async countPlayer(role: string): Promise<number> {
    try {
      const result = await this.userRepository.count({
        where: {
          role: role
        }
      })

      return result
    } catch (error) {
      throw new Error("Unable to count user role: " + error)
    }
  }

  async findUser(id: string): Promise<User> {
    try {
      const result = await this.userRepository.findOne({
        where: {
          user_id: id
        },
        relations: ["player"]
      })

      return result
    } catch (error) {
      throw new Error('failed to get user ' + error)
    }
  }

  async createUser(email: string, password: string): Promise<User> {
    try {
      const resultId = this.userRepository.findOne({
        where: {
          email: email
        }
      })


      if (resultId) {
        throw new Error("User with the provided email already exists.");
      }


      const result = this.userRepository.create({

      })

      return result;
    } catch (error) {
      throw new Error("failed to create user " + error)
    }
  }

  async updateUserStatus(id: string, status: string): Promise<User> {
    try {
      const result = await this.userRepository.findOne({
        where: {
          user_id: id
        }
      })

      result.status = status

      this.userRepository.save(result)

      return result
    } catch (error) {
      throw new Error('failed to update status user: ' + error)
    }
  }

  async updateUser(id: string, name: string, username: string, status: string, phone: string, avatar: string) {
    try {
      const result = await this.userRepository.findOne({
        where: {
          user_id: id
        }
      })

      result.name = name;
      result.username = username;
      result.status = status;
      result.phone_number = phone;
      result.avatar = avatar

      this.userRepository.save(result)

      return result
    } catch (error) {
      throw new Error("failed to update user: " + error)
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const result = await this.userRepository.findOne({
        where: {
          user_id: id
        }
      })

      if (!result) {
        throw new Error(`User with ID ${id} not found`)
      }

      this.userRepository.remove(result)

      return result
    } catch (error) {
      throw new Error("failed to delete user:  " + error)
    }
  }


}
