const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1)
const toSignedStr = n => n < 0 ? `-${n}` : `+${n}`

export {
    capitalizeFirstLetter,
    toSignedStr
}