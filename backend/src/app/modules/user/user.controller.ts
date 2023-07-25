import { Request, RequestHandler, Response } from "express";
import config from "../../../config";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";



const createUser: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const  userData  = req.body;
      console.log(userData,'userData');
      
      const result = await UserService.createUser( userData);
      const { refreshToken, ...others } = result;

      // set refresh token into cookie
      const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
      };
    
      res.cookie('refreshToken', refreshToken, cookieOptions);
    
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully !',
        data: others,
      });
    }
  );


  export const UserController = {
    createUser
    }