import react from "react";

    const errormessage = ({message,type}) => {
        const styles ={
            error: {
                colour:"red",
                backgroundcolour:"#ffe6e6",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                fontWeight: "bold",
            },
            warning :{
                color: "orange",
                backgroundColor: "#fff4e6",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                fontWeight: "bold", 
            },
            success :{
                color: "green",
                backgroundColor: "#e6ffe6",
                padding: "10px",
                borderRadius: "5px",
                marginBottom: "10px",
                fontWeight: "bold",  
            },
        };
        return (
            <div style ={styles[type || "error"]}>
                {message || "Something went wrong.Please try again."}
            </div>
        );
    };
    export default errormessage;

   