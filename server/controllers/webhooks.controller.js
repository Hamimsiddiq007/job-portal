import {webhook} from 'svix';
import User from '../models/user.model.js';

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature']
        })

        const {data, type} = req.body;

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url,
                    resume: ''
                }

                await User.create(userData);
                res.status(201).json({message: 'User created successfully'});
                break;
            }
            case 'user.updated': {
                const userData = {
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url,
                }

                await User.findByIdAndUpdate(data.id, userData);
                res.status(201).json({message: 'User updated successfully'});
                break;
            }
            case 'user.deleted': {
                await User.findByIdAndDelete(data.id);
                res.status(201).json({message: 'User deleted successfully'});
                break;
            }
            default :
                break;
        }
    } catch (error) {
        
    }
}