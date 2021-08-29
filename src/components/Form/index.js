import React, { useEffect, useMemo, useState } from 'react';

import api from '../../services/api';

import './style.css';

import camera from '../../assets/camera.svg';
import { useParams } from 'react-router-dom';

export default function New({ history }) {

    let { id } = useParams();

    const [photos, setPhotos] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    let [cont, setCont] = useState(0);

    var preview = useMemo(() => {
        return photos ? URL.createObjectURL(photos[cont]) : null;
    },
        [photos, cont]
    );

    useEffect(() => {
        async function fetchData() {
            const response = await api.listSuculenta(id);
            setName(response.data.name);
            setPrice(response.data.price);
            setStock(response.data.stock);
        }
        if (id !== '_add') {
            fetchData();
        }
    }, [id, cont]);


    async function handleSubmit(e) {
        e.preventDefault();

        if (id === '_add') {
            const suculenta = {
                name,
                price,
                stock,
            }

            const data = new FormData();

            if((photos[0] == null) || (photos[1] == null) || (photos[2] == null)) {
                alert('Não foram selecionadas 3 fotos!')
            } else {
                data.append('photos', photos[0]);
                data.append('photos', photos[1]);
                data.append('photos', photos[2]);
                data.append('suculenta', JSON.stringify(suculenta));
                if ((photos != null) && (name !== '') && (price !== '') && (stock !== '')) {
                    await api.createSuculenta(data).then(res => {
                        history.push('/');
                    });
                } else {
                    alert('Insira os dados corretamente! :)');
                }
            }
            
        } else {
            const suculenta = {
                id,
                name,
                price,
                stock,
            }

            if(photos == null) {
                await api.updateSuculentas(id, suculenta).then(res => {
                    history.push('/');
                });
            } else {
                if((photos[1] == null) || photos[2] == null) {
                    alert('Selecione 3 imagens')
                } else {
                    const data = new FormData();

                    data.append('photos', photos[0]);
                    data.append('photos', photos[1]);
                    data.append('photos', photos[2]);
                    data.append('suculenta', JSON.stringify(suculenta));
    
                    await api.createSuculenta(data).then(res => {
                        history.push('/');
                    });
                }
            }
        }
    }

    return (
        <form id="addUpdate" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="left">
                <label
                    id="photos"
                    style={{ backgroundImage: `url(${preview})` }}
                    className={photos ? 'has-photos' : ''}
                >
                    <input
                        type="file"
                        id="photos"
                        multiple
                        onChange={event => setPhotos(event.target.files)}
                    />
                    <img src={camera} alt="Suculentas" />
                    <div className={photos ? 'switch-div' : ''}>
                        <button type="button" className={photos ? 'switch-img-has' : 'switch-img'} onClick={() => {
                            if (cont === 0) {
                                alert('Esta é a primeira imagem!')
                            } else {
                                if(photos[cont-1] == null) {
                                    alert('Não tem imagens antes dessa!')
                                } else {
                                    setCont(cont - 1)
                                }
                            }
                        }} ><i className="fas fa-chevron-left"></i></button>
                        <button type="button" className={photos ? 'switch-img-has' : 'switch-img'} onClick={() => {
                            if (cont === 2) {
                                alert('Esta é a última imagem!')
                            } else {
                                if(photos[cont+1] == null) {
                                    alert('Não tem imagens depois dessa, selecione mais imagens!')
                                } else {
                                    setCont(cont + 1)
                                }
                            }
                        }} ><i className="fas fa-chevron-right"></i></button>
                    </div>
                </label>
            </div>
            <div className="right">
                <div className="input-design">
                    <label htmlFor="name">Nome</label>
                    <input type="text" placeholder="Flor de jade" id="name" value={name} onChange={event => setName(event.target.value)} required />
                </div>
                <div className="input-design">
                    <label htmlFor="price">Preço</label>
                    <input type="text" placeholder="5,50" id="price" value={price} onChange={event => setPrice(event.target.value)} required />
                </div>
                <div className="input-design">
                    <label htmlFor="stock">Estoque</label>
                    <input type="text" placeholder="10" id="stock" value={stock} onChange={event => setStock(event.target.value)} required />
                </div>
                <button type="submit">Salvar</button>
            </div>
        </form>
    );
}