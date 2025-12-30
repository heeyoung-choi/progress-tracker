function ISOToDate(isoString) {
const dateObj = new Date(isoString);

// Use 'en-GB' to force dd/mm/yyyy
return dateObj.toLocaleDateString('en-GB');
}
export default ISOToDate;