import {type ChangeEvent, useState, type SubmitEvent} from "react";
import type {ArtistMutation} from "../../../interfaces.ts";
import Stack from "@mui/material/Stack";
import {Button, TextField} from "@mui/material";

interface Props {
    onSubmit: (artist: ArtistMutation) => void;
}


const ArtistForm = ({onSubmit}: Props) => {
   const [state, setState] = useState<ArtistMutation>({
       image: "",
       name: "",
       date: "",
   });

   const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
       const { name, value } = e.target;
       setState(prevState => ({ ...prevState, [name]: value }));
   };

   const submitHandler = (e: SubmitEvent) => {
       e.preventDefault();

       onSubmit(state);
   }

    return (
        <form onSubmit={submitHandler}>
           <Stack spacing={2} sx={{maxWidth: 600}}>
               <TextField
                   id="name"
                   label="Name"
                   value={state.name}
                   name="name"
                   onChange={changeHandler}
               />
               <TextField
                   id="image"
                   label="Image"
                   value={state.image}
                   name="image"
                   onChange={changeHandler}
               />
               <TextField
                   id="date"
                   label="Date"
                   value={state.date}
                   name="date"
                   onChange={changeHandler}
               />
               <Button type="submit" color="primary" variant="contained">Create</Button>
           </Stack>
        </form>
    );
};

export default ArtistForm;