import bcrypt from "bcrypt"
import {HASH_COMPLEXITY} from "../../keys/keys.js"

export const generateHash = async (password) => 
{
    return await bcrypt.hash(password, HASH_COMPLEXITY)
}