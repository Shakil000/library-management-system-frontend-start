import { AddBooksModel } from "@/components/module/AddBooksModal";


const Home = () => {
    return (
        <div>
           <AddBooksModel open={false} setOpen={function (): void {
                throw new Error("Function not implemented.");
            } }></AddBooksModel>
        </div>
    );
};

export default Home;