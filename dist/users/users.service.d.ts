import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    create(userData: {
        username: string;
        password: string;
    }): Promise<User>;
}
