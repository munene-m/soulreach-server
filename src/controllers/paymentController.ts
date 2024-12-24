import { Request, Response } from "express";
import Tithe from "../models/tithe";
import User from "../models/user";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { CustomRequest } from "../middleware/checkJwt";
import crypto from "crypto";

dotenv.config()

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export const initializePayment = async (req: Request, res: Response) => {
    try {
        const { amount, month } = req.body;
        const id = (req as CustomRequest).token.payload.userId;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: "User not found"
            });
        }

        // Generate unique transaction reference
        const transactionReference = `TITHE-${uuidv4()}`;

        // Create tithe record
        const tithe = await Tithe.create({
            user: user._id,
            church: user.church,
            amount,
            month: new Date(month),
            transactionReference,
            paymentMethod: 'MPESA',
            paymentStatus: 'PENDING'
        });

        // Initialize Paystack transaction
        const paystackData = {
            email: user.email,
            amount,
            reference: transactionReference,
            currency: "KES",
            channels: ['mobile_money'],
            metadata: {
                titheId: tithe._id,
                userId: user._id,
                church: user.church,
                region: user.region
            }
        };

        const response = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paystackData)
        });

        const paystackResponse = await response.json();

        if (!paystackResponse.status) {
            throw new Error(paystackResponse.message);
        }

        // Return the payment URL and authorization URL to the frontend
        return res.status(200).json({
            success: true,
            data: {
                accessCode: paystackResponse.data.access_code,
                reference: transactionReference,
                titheId: tithe._id
            }
        });

    } catch (error) {
        console.error('Payment initialization error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to initialize payment',
            error: error.message
        });
    }
};

export const webhook = async(req: Request, res: Response) => {
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY as string).update(JSON.stringify(req.body)).digest('hex')
    if(hash === req.headers['x-paystack-signature']){
        const event = req.body;
        // handle the event and update the tithe record
        console.log(event);
    }
    res.send(200)
}
