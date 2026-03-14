
const Centerheading = ({ text, color , para}:{text:string; color:string; para:string}) => {
    return (
        <div className='text-center mb-10'>
            <h2 className={`font-bold text-3xl mb-3 ${color === 'black' ? 'text-black' : 'text-white'}`}>{text}</h2>
            <p className='text-gray-400'>{para}</p>
        </div>
    )
}

export default Centerheading
