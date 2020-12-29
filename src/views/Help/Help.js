import React from 'react'

function Help() {
    return(
        <div id="help">
            <form>
                <label>
                     Name:
                    <input type="text" name="name" />
                </label>
                <label>
                     Email:
                    <input type="text" name="email" />
                </label>
                <label>
                     Message:
                    <input type="text" name="message" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Help