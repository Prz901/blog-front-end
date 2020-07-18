import React from "react";
import {useHistory} from 'react-router-dom'

export default () => {

    const history = useHistory()

    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <div className="w-2/12 mb-8">
        <img className="w-full" src="/images/PageNotFound.svg " alt="imageFoundPageNotFound" />
      </div>
      <div>
        <h1 className="text-4xl font-medium text-gray-700 mb-8">
          Página nao encontrada
        </h1>
        <button  onClick={()=> history.goBack()} className="p-2 w-full text-primary-600 border border-solid border-primary-600 rounded-lg hover:bg-primary-600 hover:text-white bg-gray-100 outline-none">
          <i className="fas fa-arrow-left mr-2" />
          Voltar
        </button>
      </div>
    </div>
  );
};
