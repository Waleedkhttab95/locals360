import { PassportStrategy } from "@nestjs/passport";
import { Strategy , VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";


@Injectable()

export class GoogleStrategy extends PassportStrategy(Strategy , 'google'){

    constructor(){
        super({
            clientID: process.env.CLIENT_ID_GOOGLE_AUTH,
            clientSecret: process.env.CLIENT_SECRET_GOOGLE_AUTH,
            callbackURL:process.env.CALLBACK_URL_GOOGLE_AUTH ,
            scope: ['email', 'profile']
        })
    }

    async validate(accessToken: string , refreshToken: string , profile:any , done: VerifyCallback): Promise<any>{

        const { name, emails } = profile
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            accessToken
        }
        done(null, user);

    }
}