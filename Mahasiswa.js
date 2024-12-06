import React, { useEffect, useState } from "react";
const axios = require('axios');

const Mahasiswa = () => {

    const [data, setData] = useState([]);
    const [form, setForm] = useState ([]);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/posts', form);
            setData([ ...data, { ...form}]);
            setForm({title: '', body: ''});
            setData(response.data);
        } catch (error) {
            error('Sabar ini error');
        }
    };

    useEffect(() => {
        const ambilData = async () => {
            try {
                const response = await axios('https://jsonplaceholder.typicode.com/posts');

                setData(response.data);
            } catch (error) {
                error('Hehe error');    
            }
        };

        ambilData();
    }, []);


    return(
        <div>
            <div>Halaman Mahasiswa</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Nama</label>
                    <input type="text" name="name" value={form.title} onChange={handleInput} required />
                </div>
                <div>
                    <label htmlFor="">Alamat</label>
                    <textarea name="body" value={form.body} onChange={handleInput} required />
                </div>
                <div>
                    <button type="submit" value="kirim">Kirim</button>
                </div>
            </form>
            <table>
                <tr>
                    <td>id</td>
                    <td>nama</td>
                    <td>alamat</td>
                </tr>
                {data.map((item) => (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Mahasiswa;