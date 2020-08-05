const Loading = (status) => {
  if (status === true) {
    $(".backload").fadeIn();
    return;
  }
  $(".backload").fadeOut();
};


export default Loading;