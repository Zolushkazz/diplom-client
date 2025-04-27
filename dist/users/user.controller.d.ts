import { UsersService } from './users.service';
import { User } from './entities/users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(id: string): Promise<User>;
    create(user: User): Promise<User>;
}
