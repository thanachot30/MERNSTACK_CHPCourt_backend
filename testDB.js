import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host:process.env.MYSQL_HOST,
    user:process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
}).promise()

const getMember = async()=>{
    const [rows] = await pool.query("SELECT * FROM Member ")
    return rows;
}
const getMemberId = async(id)=>{
    // console.log(id)
    const [rows] = await pool.query(`SELECT * FROM Member WHERE memberid = ?`,[id])
    return rows[0];
}
const createMember = async(name,address,phon,email)=>{
    const [result] = await pool.query('INSERT INTO Member(name,address,phone,email) value(?,?,?,?)',[name,address,phon,email])
    return result;
}

const result = await createMember('kia','ramitar','191','kia@gmail.com');
console.log(result);



