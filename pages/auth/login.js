import axios from "axios";

export default function Login(){

    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = {
            email: event.target[0].value,
            password: event.target[0].value
        }
        try {
            let res = await axios.post(`/api/users`, data);
            console.log(res);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="text-center mt-12 text-xl font-semibold capitalize drop-shadow-[1px_1px_2px_white]">Good to see you again!</div>
            <div className="border-2 rounded-lg w-2/5 m-auto mt-9 p-5">
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center mb-5 drop-shadow-[0_2px_2px_white]">LOGIN</h3>
                    <input className="w-full bg-transparent rounded-lg border-[1px] border-grey h-12 pl-4 mb-3 box-shadow-[0px_3px_4px_white]" type="email" placeholder="Enter email" required/>
                    <input className="w-full bg-transparent rounded-lg border-[1px] border-grey h-12 pl-4" type="password" placeholder="Enter password" required/>
                    <div className="flex pt-4">
                        <input className="w-[120px] h-10 ml-auto bg-white text-black rounded-lg relative right-0 cursor-pointer" type='submit' value="SUBMIT"/>
                    </div>
                </form>
            </div>
        </div>
    )
}