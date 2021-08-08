import { PaginateOut } from "src/base/DTO/OUTPUT/PaginateOut";
import { User, UserRole } from "../Entity/User";

export class UserReturn {
    _id: string

    username: string;

    email: string;

    role: UserRole

    date: Date

    public static UserToUserReturn(user: User): UserReturn {
        return {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            date: user.date
        } as UserReturn
    }

    public static UsersToUserReturn(users: User[]): UserReturn[] {
        let usersToReturn: UserReturn[] = [];
        for (let item of users) {
            usersToReturn.push(UserReturn.UserToUserReturn(item));
        }
        return usersToReturn;
    }

    public static PaginateUserResult(paginate: PaginateOut<User>): PaginateOut<UserReturn> {

        return {
            data: UserReturn.UsersToUserReturn(paginate.data),
            page: paginate.page,
            pages: paginate.pages,
            total: paginate.total

        } as PaginateOut<UserReturn>
    }
}