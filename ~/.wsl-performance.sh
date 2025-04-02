#!/bin/bash

# Otimizações para o sistema de arquivos do WSL
echo "Aplicando otimizações para o WSL..."

# Verificar se o script está sendo executado como root
if [ "$(id -u)" -ne 0 ]; then
   echo "Este script precisa ser executado como root"
   echo "Tente: sudo ~/.wsl-performance.sh"
   exit 1
fi

# Ajustar configurações de cache
echo 100 > /proc/sys/vm/dirty_background_ratio
echo 1000 > /proc/sys/vm/dirty_expire_centisecs
echo 5 > /proc/sys/vm/dirty_ratio
echo 100 > /proc/sys/vm/dirty_writeback_centisecs

# Otimizar o I/O
echo "noop" > /sys/block/sda/queue/scheduler 2>/dev/null || true

# Ajustar uso de memória
echo 32768 > /proc/sys/vm/min_free_kbytes

echo "Otimizações aplicadas. As alterações serão perdidas na reinicialização do WSL."
echo "Para aplicar permanentemente, adicione este script ao seu .bashrc ou .zshrc:"
echo "  sudo ~/.wsl-performance.sh" 