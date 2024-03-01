import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Player } from 'src/entities/player';
import { User } from 'src/entities/user';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PlayerService {
    constructor(
        @InjectRepository(Player) private playerRepository: Repository<Player>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectEntityManager() private entityManager: EntityManager
    ) { }

    async findAll(filter: { where: {} }): Promise<Player[]> {
        try {
            const result = this.playerRepository.find({
                ...filter,
                relations: ["user", "favoriteCategory"]
            })

            return result
        } catch (error) {
            throw new Error("failed get all player")
        }
    }

    async findOne(filter: { where: {} }): Promise<Player> {
        try {
            const result = this.playerRepository.findOne({
                ...filter,
                relations: ["user", "favoriteCategory"]
            })

            return result
        } catch (error) {
            throw new Error("failed  to find one player: " + error)
        }
    }

    async findPlayers(id: string): Promise<Player[]> {
        try {
            const result = this.playerRepository.find({
                where: {
                    player_id: id
                },
                relations: ["user", "favoriteCategory"]
            })

            return result

        } catch (error) {
            throw new Error("failed to find players: " + error)
        }
    }

    async createPlayer(data: any): Promise<Player> {
        const user = this.entityManager.create(User, data);

        try {
            const savedPlayer = await this.entityManager.transaction(async entityManager => {
                const savedUser = await entityManager.save(user);

                const player = this.entityManager.create(Player, {
                    user: savedUser,
                    favorite: data.favorite,
                });

                const savedPlayer = await entityManager.save(player);

                return savedPlayer;
            });
            const playerWithUser = await this.entityManager.findOne(Player, {
                where: {
                    player_id: savedPlayer.player_id
                },
                relations: ["user"]
            });

            return playerWithUser;
        } catch (error) {
            throw new Error("Failed to create player: " + error.message);
        }
    }

    async updatePlayer(id: string, data: any): Promise<User> {
        try {
            const result = await this.userRepository.findOne({
                where: {
                    user_id: id
                }
            })

            if (!result) {
                throw new Error('failed to find player no define')
            }

            result.name = data.name;
            result.username = data.username;
            result.avatar = data.avatar;
            result.phone_number = data.phone_number;


            return result;
        } catch (error) {
            throw new Error('failed to update player')
        }
    }

    async deletePlayer(id: string): Promise<Player> {
        try {
            const result = await this.playerRepository.findOne({
                where: {
                    player_id: id
                }
            })

            if (!result) {
                throw new Error('failed to find player no define')
            }

            this.playerRepository.remove(result)

            return result
        } catch (error) {
            throw new Error('failed to delete player')
        }
    }
}
