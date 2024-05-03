import React from 'react';

export default function UserProfile() {
    return (
        <div className="relative">
            {/* Header com gradiente de cinza */}
            <header className={`w-full h-[20vh] md:h-[25vh] lg:h-[35vh] bg-gradient-to-r from-gray-300 to-gray-500 relative`}>
                {/* Ícone do usuário */}
                <div className={`w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-gray-400 rounded-full border-4 md:border-4 lg:border-4 border-white absolute left-1/2 md:left-1/2 lg:left-1/4 transform -translate-x-1/2 bottom-[-50px] md:bottom-[-50px] lg:bottom-[-50px]`}>
                    {/* ...conteúdo do ícone do usuário, se necessário */}
                </div>
                {/* Informações do usuário */}
                <div className="absolute left-1/2 md:left-1/2 lg:left-1/4 transform -translate-x-1/2 bottom-[-140px] md:bottom-[-140px] lg:bottom-[-155px] text-center">
                    {/* Nome do usuário */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Nome do Usuário</h2>
                    {/* Categoria */}
                    <p className="text-sm md:text-md lg:text-lg text-gray-500">Categoria</p>
                    {/* Email */}
                    <p className="text-xs md:text-sm lg:text-md text-gray-400">email@exemplo.com</p>
                </div>
            </header>
            {/* Espaço entre header e navegação */}
            <div className="h-4"></div>
            {/* Navegação */}
            <nav className="relative w-full flex items-center py-2 px-40">
                <div className="flex space-x-10 mx-auto">
                    <a href="#" className="font-bold">ÚLTIMOS ELOGIOS</a>
                    <a href="#" className="text-gray-500 hover:text-black">DESEMPENHO</a>
                    <a href="#" className="text-gray-500 hover:text-black">CONTATO</a>
                </div>
                <button className="bg-blue-500 px-6 py-2 rounded text-white absolute right-24">Faça um elogio!</button>
            </nav>
        </div>
    );
}
