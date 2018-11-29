import Request from '../../common/Request';

class AdsBannerService {
  all = () => new Request().get('ads');
}

export default new AdsBannerService();
