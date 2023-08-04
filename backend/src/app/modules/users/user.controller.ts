import { Request, RequestHandler, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './user.interface';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    console.log(userData, 'userData');

    const result = await UserService.createUser(userData);
    // const { refreshToken, ...others } = result;

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
      data: result,
    });
  }
);

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    console.log(userData, 'userData');

    const result = await UserService.loginUser(userData);
    // const { others } = result;

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
      data: result,
    });
  }
);


const wishlist = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const user = req.user;
  console.log(bookId, 'bookId wishlisht');
  const result = await UserService.wishlist(user, bookId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Added to wishlist !',
    data: result,
  });
}
);


const getWishList = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getWishList(user);
  
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Gett the wishlist !',
    data: result,
  });
}
)

const removeFromWishlist = catchAsync(async (req: Request, res: Response) => {

  const user = req.user;

  const { bookId } = req.params;
  console.log(bookId,'bookis');
  
  const result = await UserService.removeFromWishlist(user, bookId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Remove from the Wishlist !',
    data: result,
  })
}
)


const readingList = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const user = req.user;
  const result = await UserService.readingList(user, bookId);
  

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Added to Readinglist !',
    data: result,
  });
}
)


const getReadingList = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getReadingList(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get the Readin list !',
    data: result,
  });
}
)

const removeFromReadingList = catchAsync(async (req: Request, res: Response) => {

  const user = req.user;

  const { bookId } = req.params;
  console.log(bookId, 'from readinglist');
  
  const result = await UserService.removeFromReadingList(user, bookId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Remove from the Readinglist !',
    data: result,
  })
}
)



const finishedBooks = catchAsync(async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const user = req.user;
  console.log(bookId, 'bookId finished book');
  const result = await UserService.finishedBooks(user, bookId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Added to wishlist !',
    data: result,
  });
}
)


const getFinishedBooks = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.getFinishedBooks(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Added to wishlist !',
    data: result,
  });
}
)


const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await UserService.refreshToken(refreshToken);

  // set refresh token into cookie

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully !',
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {

  const user = req.user;
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile !',
    data: user,
  });
})

export const UserController = {
  createUser,
  loginUser,
  refreshToken,
  getMe,
  wishlist,
  readingList,
  finishedBooks,
  getFinishedBooks,
  getWishList,
  getReadingList,
  removeFromReadingList,
  removeFromWishlist,

};
