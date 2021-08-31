import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

export default function Details({ history }) {

    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [stock, setStock] = useState();
    let [cont, setCont] = useState(1);

    let { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            const response = await api.listSuculenta(id);
            setName(response.data.name);
            setPrice(response.data.price);
            setStock(response.data.stock);
        }
        fetchData();
    }, [id])

    function edtSuculenta(id) {
        history.push(`/suculenta/${id}`);

    }

    async function dltSuculenta(id) {
        await api.deleteSuculenta(id).then(res => {
            history.push('/');
        });
    }

    return (
        <div className="details">
            <div className="left">
                <img src={`https://192.168.0.104:8080/assets/uploads/${id}-${cont}.png`} alt="" />
                <div className="btns-imgs">
                    <button type="button" onClick={() => {
                        if (cont === 1) {
                            alert('Esta é a primeira imagem!')
                        } else {
                            setCont(cont - 1)
                        }
                    }} ><i className="fas fa-chevron-left"></i></button>
                    <button type="button" onClick={() => {
                        if (cont === 3) {
                            alert('Esta é a última imagem!')
                        } else {
                            setCont(cont + 1)
                        }
                    }} ><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div className="right">
                <strong>{name}</strong>
                <p className="price">R$ {price}</p>
                <p className="stock">Quantidade: {stock}</p>
                <div className="btns">
                    <button className="btn edit" onClick={() => edtSuculenta(id)}>Editar</button>
                    <button className="btn delete" onClick={() => dltSuculenta(id)}>Apagar</button>
                </div>
            </div>
        </div>
    );
}