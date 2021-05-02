import { ImageParticle } from './ImageParticle.js';

export class ImageParticleFactory {
  images = [];
  
  constructor({ images, minScale, maxScale }) {
    // We have some fallback images for our particles, which we can use if no images have been passed into the constructor
    const fallbackImages = [
      {
        name: 'square',
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAM1BMVEUAAAD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQD9vQCEzyW/AAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAShJREFUeAHt2uFq7CAQxfGj5kYz68bz/k97l9KWTTcupHikH+b3An8mIUFwcEXMtfGh1RyhEY1PTJLJ/CFjOOMLkzcElcJTBQMldiSMU9lRBYMoR9nYtWGUnV07Bgl8I2CMhW8sEyMe8YhHPOIRj3jEI8uZPDCy2s7r8nIu4FUojWPtW8LRv0aBesgYRQq+hDtlDJ9upLxSKJXxECkWARjFDIiUi8iUy6iUq2iUa+AEHrlkzouvlKtzPsZIuTjnBykfpUU8ZEqt+GDqh6WuGL4VarQVT1KlgAUcpW3nULcccCIs535z4I64iO8s6POIRzziEY94xCMeaTMidUakzLhgTuzbMcp9xqX/yq4E/SgV4yzsSPOXY/RrPqKKYbjceJT/+hKZYB3uPxidICnZQ31BAAAAAElFTkSuQmCC",
      },
      {
        name: 'triangle',
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABcCAMAAACvFeCmAAAAM1BMVEUAAADtQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3tQS3qGOtVAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAk5JREFUeAHd2N2y2yoMBeDFDxgDRnr/pz374kzb3dh4YbkznX73mZXIchDCEh//5/FHxNKG/mL0khxe5Leup4494B2568QoHlauiN6p0R5B6IaqbaKs6vBIOHSBbHig6KLmsMh1XSYRS8LQJzIWJNFnKmhZH6v2DD7FnmFPSUowpgRRG6LH3FC7gLmuLxgOM5u+omEi6EsSrh36EnH2Yhn62Im+JxhOEOlfRO91nPJ64yjx5xR26I2IM7tO1YBvQuXbmHwizeODbzrjF1tL0oPDbcenoZcOjwv+0Euy9LIfDpfcsfLa73wGm1L5ask0Y9Ywwlcr4kakP1oMh2ll+6vzxeIL1vGdXiimsZl8JA4EpxcCNQc1UBo1txTbBJ2pYtdJtQz1akxzHSAdeqozIQ2kxoRMa2po4r8mJIGUDCERpKjn/tFnchivmZV5zzrT5xPU55ueA4n6Wym29orUM838gLYy4WbqqwgowhVCL2TTeoG8yA0Qhp472AFyw62NHYmSXhCPG17oYZi/l/H7BfJsI/5b6sJdK/O3GfYSmKleJ35LXboEofLbWG7nWldv2JJxIotO+PUtVE/4TeoPtgVR58Ye8EPYh87Fpws16Xv5shOLj05su8wC0Y9WlbiXWYkjBkGrREznVs2+FraubN/psECc11aZmTiNKgjVnPF6imFGt2fYU+wZhoX6hiVJdJkkLPJdF3WPdUV0gRQ84rv9ZxDiUMqIsMiDiMiwik2nWsQb3Nb1Qt8cXuPS3j8C9uTwuhBLKb33VkqJAbz/ANmIMSZWkWGiAAAAAElFTkSuQmCC",
      },
      {
        name: 'line',
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAQCAMAAADXjyqxAAAASFBMVEUAAAABAAIBAQMCAQUBAAIBAQMDAgZ+SP98R/99R/97Rv59R/97Rv58R/9/SP97Rv57Rv57Rv57Rv58R/97Rv57Rv57Rv57Rv5jZm49AAAAF3RSTlMAAAAAAQECEyMkMVRhY2aHr7/F0tTk84juFNUAAABRSURBVHja7dTJFYAgFEPRqDjgjArpv1NpIjkuvA1k8/9DNewXRfIxdqja+FCoLD3QTIVaW0C4qTZjpdyJRD3wH/ncSKKe5YQtz2jJiiWQltS/EgmMXd6s1GYAAAAASUVORK5CYII=",
      },
      {
        name: 'pentagon',
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABjCAMAAABaOVXeAAAAM1BMVEUAAAA+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvc+gvezXsREAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAjxJREFUeAG1muGunCAQRgcQVESG93/apjetyU3vBA87Pb83qxyZ79vICiDuVx9faDuS/A9KG9/oexBnch//oLt4Eq7xI3cUN1IfBprFiX0Mmxr8VNncyU+VjRZ/VVwZV8WVcVVcGVfFlXFVXBlXxZVxVVwZV8WVcVVcGVfFlXFVXJm/KqaMqwLKgCr9TNn2QlVP8f5E2THmXEFEzmVloY05u3yRF5Vt+kaV/GFN2f5O1cM7ZfKN+lrVQ1Z4lUpUEWVVHgpT9XCC5Seiiir7K+DGqh5iGxPuRxZWBSa4yG86V0UGrD8LAapwVBQRuVgEcWVNJNAw5cqiZFoLXFmRk6riyqo0qoora9KxKq5MuCquTLgqrkzswFmhEl1R1jBWcvO8sjGGztjCzdPWbe2IIBQ70C/JZnRyktUVwSgq4VgRlcyoF4zV490urSyYOH7kFLF8VbeXC5u9SPWypZMbIEyUmCoZk4fbjU0BMbZpmGxvhjFws0ElTKOje5RKnYRg9SgVndxpdvC1Tb9DWUiCcIwvfL5n/lzLx6WS5hPNQhKEY5pPq3pUyfRG8odVUvmHuK3Ml2tj68YPjlcJ2YIGfARwSIJwBLGAw/HiAcerZOdRzW1F7pWHI69PG1Tfw5lkTK0nHUzUMifIhmU20AmrKMjrZSppHs6k725XWwbF1ZZB0OFFwu+SOI3/suEknHWcA7c158YFxNFIa46jyeF8mZyDgDNNQgvyjnAMDv+jVKw6OHoEQYRC6/gq1iV+ATaATiIKa4OvAAAAAElFTkSuQmCC",
      },
      {
        name: 'circle',
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABsCAMAAACrb+cLAAAAM1BMVEUAAAAtqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8tqU8MEU6JAAAAEHRSTlMAECAwQFBgcICPn6+/z9/vIxqCigAAAY1JREFUeAHt2MGK8yAUQOGb2FjrX6vv/7Q/sxsY4RCOWQyTs9cPLqVyE3d3f6q9lMfVRupjjNe1xtbGV/lqgxVvsOINVrzBijdY8QYr3mDFG5Mey41JPa01hCKMxcq/MS5X6hiseIMVb3jFG6x4gxVvaAUMoYDRn/teulAmxvyuNFP2tcZcadtaQytgLFQKGCuUzAYr3mDFG6x4gxVvsOINVryhFTSEIgxWhAFK1YZQ2PDKwYZWUmfDKmx4JXW946TJBS9+CGuc6jW5Yo9vfWbIcQ550Czago3woCvK8Mvte/LL4Y2tnTIyDnyuVGnkCK+w8UPprFgjIpEiDFDKKYPPzZXMBk9AK2AIRRikCIMfyGwMPgYKGqjwG5n5H88qc2MLr3iDFW+wIoxJlRRhgLKx4ZW28TiXKGx4ZY+IAoZWxrt+2PCfndcasTVvLFPY8EqOsIowhAKGUMDwSmfDl7owvFKC8kqNWK+w4RU2vMKG72BjQZmNtUoLyitti8sVNrzyBkO3P8sRv7W7u7v/sSm7FcXgsvQAAAAASUVORK5CYII="
      }
    ];
    
    const medias = images || fallbackImages;
    this.images = medias.map((media) => {
      const image = new Image;
      image.src = media.src;
      image.onload = () => {
        image.imageLoaded = true;
      };
      return image;
    });
  
    this.scaleRange = {
      min: minScale || 0.1,
      max: maxScale || 0.5
    };
  }
  
  createParticle({canvasContext, initialX, initialY, behaviouralProperties}) {
    const particleImage = this.images[Math.floor(Math.random() * this.images.length)];
    const scale = Math.random() * (this.scaleRange.max - this.scaleRange.min) + this.scaleRange.min;
    return new ImageParticle({
      canvasContext: canvasContext,
      behaviouralProperties: behaviouralProperties,
      initialX: initialX,
      initialY: initialY,
      image: particleImage,
      scale: scale
    })
  }
}