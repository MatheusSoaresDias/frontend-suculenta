import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import api from '../../services/api';

export default function Dashboard({ history }) {

    const [suculentas, setSuculentas] = useState([]);

    let { name } = useParams();

    var url = useLocation();

    useEffect(() => {

        if(url.pathname === '/') {
            async function loadSuculentas() {
                const response = await api.listSuculentas();
                setSuculentas(response.data);
            }
            loadSuculentas();
        } else {
            async function searchSuculenta() {
                const response = await api.searchSuculenta(name);
                setSuculentas(response.data);
            }
            searchSuculenta();
        }
    }, [suculentas, name, url]);

    function edtSuculenta(id) {
        history.push(`/suculenta/${id}`);
    }

    async function dltSuculenta(id) {
        await api.deleteSuculenta(id).then(res => {
            history.push('/');
        });
    }

    return (
        <section id="dashboard">
            {suculentas.map(suculenta => (
                <article key={suculenta.id}>
                    <Link to={`/details/${suculenta.id}`}>
                        <img src={`http://localhost:8080/assets/uploads/${suculenta.id}-1.png`} loading="lazy" alt="" />
                    </Link>
                    <div className="info">
                        <strong>{suculenta.name}</strong>
                        <p className="price">R$ {suculenta.price}</p>
                        <p className="stock">Quantidade: {suculenta.stock}</p>
                        <div className="btns">
                            <button className="btn edit" onClick={() => edtSuculenta(suculenta.id)}>Editar</button>
                            <button className="btn delete" onClick={() => dltSuculenta(suculenta.id)}>Apagar</button>
                        </div>
                    </div>
                </article>
            ))}

        </section>
    )
}