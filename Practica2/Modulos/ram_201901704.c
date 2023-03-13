
#include <linux/module.h>
#include <linux/kernel.h>



#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>
#include<linux/sysinfo.h>
#include <linux/mm.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de ram, practica 2");
MODULE_AUTHOR("Jose Adrian Aguilar Sanchez");

struct sysinfo info_ram;
static int escribir_archivo(struct seq_file *archivo, void *v){
    si_meminfo(&info_ram);

    seq_printf(archivo,"Probando\n"); 
    seq_printf(archivo,"Probando otra cadena\n");
    seq_printf(archivo,"%lu",info_ram.freeram);
    return 0;
}

//Informacion que se muestra al mostrar archivo con cat
static int al_abrir(struct inode *inode, struct file *file){
    
    return single_open(file,escribir_archivo,NULL);
}

static struct proc_ops operaciones = {
    .proc_open = al_abrir,
    .proc_read = seq_read
};


static int _insert(void){
    proc_create("ram_201901704",0,NULL,&operaciones);
    printk(KERN_INFO "201901704\n");
    return 0;
}

static void _remove(void){
    remove_proc_entry("ram_201901704", NULL);
    printk(KERN_INFO "Sistemas operativos 1\n");

}



module_init(_insert);
module_exit(_remove);