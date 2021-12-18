import React, {useEffect} from 'react';
import {IModalClass, IModalProps, ModalState, NoneAnimate} from "../_util/types";
import store from "../_util/store";
import {makeObserver} from "../_util/utils";
import './styles/index.css'
import './styles/keyframe.css'

const appearStates = [ModalState.SHOW, ModalState.CLOSING, ModalState.OPENING]


const ModalContainer: React.FC<IModalProps> = (props) => {


  const {popList} = store;
  // const a = [...popList];

  // const [showPopList, setShowPopList] = useState<IModalClass [] >([])

  // useEffect(() => {
  //   setShowPopList(a.filter(v => appearStates.includes(v.state)))
  // }, [a])
  const showPopList = popList.filter(v => appearStates.includes(v.state));

  useEffect(() => {
    if (!props.modalMap) return;
    // 更新store的modalMap
    store.modalMap = props.modalMap
  }, [props.modalMap])


  // /**
  //  * 过滤出可见弹窗进行渲染
  //  */
  // useEffect(() => {
  //   const list = popList.filter(v => appearStates.includes(v.state))
  //   setShowPopList(list);
  // })

  /**
   * animate end 处理， 切换对象生命状态
   */
  const handleAnimateEnd = (pop: IModalClass) => {
    // console.log('aaaa')
    if (pop.state === ModalState.OPENING) pop.changeState(ModalState.SHOW)
    if (pop.state === ModalState.CLOSING) pop.changeState(ModalState.CLOSED)
  }

  const calculateTargetAnimation = (pop: IModalClass) => {
    if (pop.state === ModalState.SHOW) return "";
    const ani = pop.animate;
    if (ani === NoneAnimate) return "";
    else return `${ani.name} ${ani.duration}ms ${ani.timingFunction} `
  }

  const calculateBodyAnimation = (pop: IModalClass) => {
    if (pop.state === ModalState.OPENING) return 'modal-zoom-in'
    if (pop.state === ModalState.CLOSING) return 'modal-zoom-out'
    return ""
  }

  const preventClick = (e: React.MouseEvent, pop: IModalClass) => {
    if (pop.state === ModalState.OPENING || pop.state === ModalState.CLOSING){

      e.preventDefault();
      return true;

    }
  }


  return (
    <section>
      {
        showPopList.map(pop => {
          // console.log(pop.key, pop.state)
          const Pop = pop.component;
          console.log(pop.props)
          return <section className={`modal-container ${calculateBodyAnimation(pop)}`}
                          key={pop.id}
                          onClickCapture={(e) => preventClick(e, pop)}
                          onMouseDown={(e) => preventClick(e, pop)}
                          onMouseUp={(e) => preventClick(e, pop)}
          >
            <div style={{animation: calculateTargetAnimation(pop)}} onAnimationEnd={() => handleAnimateEnd(pop)}>
              {/*{{...Pop, props: pop.props}}*/}
              <Pop {...pop.props} />
            </div>

          </section>
        })
      }
      {/*<div*/}
      {/*  className={`modal-body ${this.renderAni(popObj, ModalState.BEFORE_APPEAR, "modalZoomIn")} ${this.renderAni(popObj, ModalState.BEFORE_CLOSE, "modalZoomOut")}`}>*/}
      {/*  <PopUp popData={popData}/>*/}
      {/*</div>*/}
    </section>
  )

}


export default makeObserver<IModalProps>(ModalContainer)
