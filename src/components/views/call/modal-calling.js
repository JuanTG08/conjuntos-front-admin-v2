import { PhoneXMarkIcon } from "@/components/Icons/PhoneXMarkIcon";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

const ModalCalling = ({
  isModalCalling,
  onModalCallingChange,
  userCalling,
  endCall,
}) => {
  return (
    <Modal
      isOpen={isModalCalling}
      onOpenChange={onModalCallingChange}
      isDismissable={false}
      onClose={() => endCall(null)}
      placement="center"
      size="full"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Llamando a {userCalling?.name}
            </ModalHeader>
            <ModalBody>
              <p>
                Nombre: {userCalling?.name} {userCalling?.last_name}
              </p>
              <p>Información de la llamada</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                size="lg"
                className="w-full"
                variant="solid"
                startContent={<PhoneXMarkIcon />}
                onPress={onClose}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalCalling;
