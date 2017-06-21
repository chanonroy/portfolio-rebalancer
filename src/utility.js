export default function Tools() {

  this.add_commas = function(value) {
    // add commas to a number
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  this.add_abbrev = function(value) {
    // calculate abbreviated numbers (e.g. 1,000 is 1K)
    var str = value.toString();
    if (str.length < 7) { // 1,000 (1K)
      return str > 999 ? (Math.floor((str / 1000) * 10) / 10).toString() + 'K' : str;
    } else if (str.length < 10) { // 1,000,000 (1M)
      return str > 999999 ? (Math.floor((str / 1000000) * 10) / 10).toString() + 'M' : str;
    } else { // 1,000,000,000 (1B)
      return str > 999999999 ? (Math.floor((str / 1000000000) * 10) / 10).toString() + 'B' : str;
    }
  }

}
