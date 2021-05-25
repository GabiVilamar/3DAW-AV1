const mysql = require('mysql2/promise');
async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const connection = await mysql.createConnection({
        host: 'localhost',
        port:3306,
        user:'root',
        password:'Annamanunico3',
        database:'crud-3daw'
    });

    console.log("Conectou no MySQL");
    global.connection = connection;
    return global.connection;    
}
connect();

async function selectDisciplina(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM disciplina;');
    return rows;
}
async function selectOneDisciplina(id) {
    const conn = await connect();
    const sql = "SELECT * FROM disciplina WHERE id=?";
    const [rows] = await conn.query(sql, [id]);
    return rows && rows.length > 0 ? rows[0] : {};
}

async function insertDisciplina(disciplina) {
    const conn = await connect();
    const sql = "INSERT INTO disciplina(id, periodo, nome, idPreRequisito, creditos) VALUES (?,?,?,?,?);";
    return await conn.query(sql,[disciplina.id, disciplina.periodo, disciplina.nome, disciplina.idPreRequisito, disciplina.creditos]);
}

async function updateDisciplina(id, disciplina) {
    const conn = await connect();
    const sql = "UPDATE disciplina SET id=?, periodo=?, nome=?, idPreRequisito=?, creditos=? WHERE id=?";
    return await conn.query(sql,[disciplina.id, disciplina.periodo, disciplina.nome, disciplina.idPreRequisito, disciplina.creditos, id]);
}

async function deleteDisciplina(id) {
    const conn = await connect();
    return await conn.query("DELETE FROM disciplina WHERE id=?;", [id]);

}

module.exports = {selectDisciplina, selectOneDisciplina, insertDisciplina, updateDisciplina, deleteDisciplina};