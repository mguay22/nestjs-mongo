import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";

import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
    constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
      super(userModel)
    }
}