import React from 'react';
import {InputField, Button} from 'govuk-react';

function PatientRegNHS(){

    return(
    <>
        <h1>Register With NHS number</h1>

        <div class = "container">
            <div class = "NHS">
                <InputField
                    input={{
                        id:"NHS",
                        name:"NHS",
                        type:"NHS",
                        label:"NHS",
                    }}
                        >
                NHS number
                </InputField>
            </div>

            <div class = "email">
                <InputField
                    hint="e.g. name@email.com"
                    input={{
                        autoComplete: 'email',
                        name: 'email',
                        type: 'email',
                        label: 'email'
                    }}
                    >
                    Email address
                </InputField>
            </div>

            <div class = "Password">
                <InputField
                    hint="Create a strong password"
                    input={{
                        id:"Password",
                        name:"Password",
                        type:"Password",
                        label:"Password",
                        
                    }}
                        >
                Password
                </InputField>
            </div>

            <div class="register">
                    <Button>
                        Register
                    </Button>
            </div>
        </div>
    
    </>
    )
}
export default PatientRegNHS;