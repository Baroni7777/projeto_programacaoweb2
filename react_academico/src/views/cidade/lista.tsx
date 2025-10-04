import axios from "axios";
import { useEffect, useState } from "react"
import type { Cidade } from "../../type/cidade";



export default function Lista(){

 // Busca as cidades do backend
 // Reagir as alterações na variavel
 // renderiza a lista de cidades
const [cidades, setCidades] = useState<Cidade[] | null >(null);
// hook -- função -- reagir quando carregar a pagina 
// hook -- função -- reagir quando a variavel cidades mudar
// pela primeira vez, quando o array for vazio
     useEffect(()=>{
        async function getCidades(){
           await axios.get('http://localhost:8001/rest/sistema/cidade/listar')
            .then((response:any )=>{
                setCidades(response.data.dados);
            });
            
        }
        getCidades();
     },[])

     console.log(cidades);
     
// renderiza a lista de cidades
     return (
        <div className="display">
           <div className="card animated fadeInDown">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
                 <h1>Lista de Cidades</h1>
                 <a href="#" className="btn-add">Nova Cidade</a>
                 <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Código</th>
                            <th>Nome</th>

                        </tr>
                    </thead>
                    <tbody>
                         {
                            cidades?.map((cidade) => (
                                <tr>
                                    <td>
                                        {cidade.idCidade}
                                        {cidade.codCidade}
                                        {cidade.nomeCidade}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                 </table>
              </div>
           </div>
        </div>
     )
}