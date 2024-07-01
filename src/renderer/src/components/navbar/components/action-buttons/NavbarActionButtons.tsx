import "./styles/navbarActionButtons.css";
import minimize from "../../../../assets/icons/Minimize.svg";
import maximize from "../../../../assets/icons/Maximize.svg";
import close from '../../../../assets/icons/Close.svg'

const BASE_CLASSNAME = "lt-action-buttons";

const BUTTONS = [
  {
    id: "minimize",
    icon: minimize,
    enabled: true,
    action: () => {
      (window as any).api.minimize();
    },
  },
  {
    id: "maximize",
    icon: maximize,
    enabled: true,
    action: () => {
        (window as any).api.maximize();
      },
  },
  {
    id: "close",
    icon: close,
    enabled: true,
    action: () => {
      (window as any).api.close();
    },
  },
];

export const NavbarActionButtons = () => {
  return (
    <>
      <div className={`${BASE_CLASSNAME}`}>
        <div className={`${BASE_CLASSNAME}--content`}>
          {BUTTONS.map((b) => {
            return (
              <div
                className={`${BASE_CLASSNAME}--content-inner`}
                key={`item-${b.id}`}
                style={{ display: "flex", margin: "auto" }}
              >
                <button id={b.id} className={`${BASE_CLASSNAME}--button`} disabled={!b.enabled} onClick={() => {
                    b.action && b.action()
                }}>
                  <img src={b.icon} height={"16px"} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
