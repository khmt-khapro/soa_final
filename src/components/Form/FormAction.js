import React from 'react'

function FormAction({
    handleSubmit,
    action='submit',
    text,
    customStyle
}) {
  return (
    <>
        <button 
            onSubmit={handleSubmit} 
            type={action}
            className={'w-full py-2 px-4 rounded-sm text-md text-gray-50 ' + customStyle}
        >
            {text}
        </button>
        {/* {
                type==='Button' 
                    ?
                <button/>
                    :
                <></>
        } */}
    </>
  )
}

export default FormAction