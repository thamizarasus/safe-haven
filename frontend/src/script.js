function toggleCardDetails() {
    const checkbox = document.getElementById('creditOption');
    const cardDetails = document.getElementById('cardDetails');
    cardDetails.style.display = checkbox.checked ? 'block' : 'none';
  }