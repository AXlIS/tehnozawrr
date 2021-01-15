export default function numberFormat(value){
  if (typeof value === 'number')
  {
    console.log(typeof value)
    return new Intl.NumberFormat().format(value);
  }
}
